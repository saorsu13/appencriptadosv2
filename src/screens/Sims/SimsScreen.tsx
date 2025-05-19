// src/screens/Sim/SimScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import SimCountry from '@/components/organisms/SimCountry/SimCountry';
import BalanceDetails from '@/components/organisms/BalanceDetails/BalanceDetails';
import NetworkProfile from '@/components/organisms/NetworkProfile/NetworkProfile';
import Alert from '@/components/molecules/Alert/Alert';
import Label from '@/components/atoms/Label/Label';
import SimOptions from '@/components/organisms/SimOptions/SimOptions';
import Skeleton2x2 from '@/components/molecules/Skeleton2x2/Skeleton2x2';
import { SimStyles } from '@/styles/SimStyles/SimStyles';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SimStackParamList } from '@/navigation/SimStackNavigator';
import DeleteSimButton from '@/components/molecules/DeleteSimButton/DeleteSimButton';
import DeleteSimModal from '@/components/molecules/BalanceModals/DeleteSimModal';
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles';
import { useSimManager } from '@/hooks/useSimManager';
import { RootStackParamList } from '@/navigation/types';
import { updateSimCurrency } from '@/features/sims/simSlice';
import { updateSim } from '@/features/sims/simService';
import { useBalance } from '@/hooks/useBalance';
import { useTranslation } from 'react-i18next';


type SimNavProp = NativeStackNavigationProp<SimStackParamList>;
type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function SimScreen() {
  const { t } = useTranslation();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const [refreshing, setRefreshing] = useState(false);
  const sims = useAppSelector(state => state.sims.sims);
  const currentSim = useAppSelector(state => state.sims.currentSim);
  const { restoreSimFromStorage, changeSim, deleteSimAndRedirect } = useSimManager();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);


  const navigationSim = useNavigation<SimNavProp>();
  const navigationRoot = useNavigation<RootNavProp>();

  console.log('[Sim] SIM actual en Redux:', currentSim);
  console.log('[Sim] Moneda actual de la SIM:', currentSim?.currency);
  console.log('[Sim] Lista de SIMs en Redux:', sims);

  const simId = currentSim?.iccid;
  const [countryCode, currencyCode] = currentSim?.currency
    ?.split('-')
    .map(p => p.toUpperCase()) ?? [undefined, undefined];

  const isTottoli = currentSim?.provider === 'tottoli';
  const fetchSimId = isTottoli ? simId : undefined;
  const fetchCurrency = isTottoli ? currencyCode : undefined;
  const fetchCountry = isTottoli ? countryCode : undefined;

  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
    refetch: refetchBalance,
  } = useBalance(fetchSimId, fetchCurrency, fetchCountry);

  const imsiChangesAvailable = balanceData?.data?.imsi_changes_availables ?? 0;

  console.log("este es el numero de cambios IMSI disp", imsiChangesAvailable)
  const handleCurrencyChange = async (value: string) => {
    if (!currentSim) return;
    dispatch(updateSimCurrency({ id: currentSim.idSim, currency: value }));
    await updateSim({ ...currentSim, currency: value });
  };

  const onRefresh = () => {
    console.log('[Sim] Usuario disparó refresh manual');
    setRefreshing(true);
    refetchBalance().finally(() => setRefreshing(false));
  };

  const handleSimChange = async (newId: string) => {
    const selectedSim = sims.find(sim => sim.idSim === newId);
    if (selectedSim) {
      await changeSim(selectedSim);
    }
  };

  const handleDelete = async () => {
    if (currentSim) {
      const success = await deleteSimAndRedirect(currentSim, sims);
      if (success) setShowModal(false);
      else setRedirectToLogin(true);
    }
  };

  useEffect(() => {
    if (sims.length > 0 && !redirectToLogin) {
      restoreSimFromStorage(sims);
    }
  }, [sims]);

  useEffect(() => {
    if (redirectToLogin) {
      navigationRoot.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [redirectToLogin]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={balanceStyles.container}>
        <HeaderEncrypted owner="encriptados" settingsLink="SimSettings" />

        <View style={SimStyles.inner}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <SimCountry
              sims={sims.map(sim => ({
                id: sim.idSim,
                name: sim.simName ?? sim.name ?? 'SIM',
                number: sim.iccid,
                provider: sim.provider,
                logo: null,
              }))}
              selectedSimId={currentSim?.idSim ?? ''}
              onSelectSim={handleSimChange}
              selectedCurrency={currentSim?.currency}
              onSelectCurrency={handleCurrencyChange}
              onAddSim={() => {
                console.log('[Sim] Usuario quiere añadir una nueva SIM');
                navigationSim.navigate('NewSimTottoli');
              }}
              onEditSim={(id) => {
                console.log('[Sim] Usuario quiere editar la SIM:', id);
                navigationSim.navigate('EditSimTottoli', { idSim: id });
              }}
            />
          </View>

          {isTottoli && (
            balanceLoading ? (
              <Skeleton2x2
                layout={[
                  { width: '48%', height: 135, borderRadius: 20, marginVertical: 5, },
                  { width: '48%', height: 135, borderRadius: 20, marginVertical: 5, },
                  { width: '48%', height: 135, borderRadius: 20, marginVertical: 5, },
                ]}
                containerStyle={{ width: '100%' }}
              />
            ) : balanceError ? (
              <Alert
                type="error"
                message={t('pages.home.balanceError.title')}
                description={t('pages.home.balanceError.description')}
                showIcon
              />
            ) : (
              <BalanceDetails data={balanceData} />
            )
          )}

          <NetworkProfile />

          <Alert
            message={t('pages.home.profileWarning.title')}
            description={t('pages.home.profileWarning.description')}
            type="warning"
            showIcon
          />

          <Label
            fixWidth
            label={t('pages.home.simOptions.title')}
            variant="semiBold"
          />

          <SimOptions imsiChangesAvailable={imsiChangesAvailable} />

          <DeleteSimButton
            onPress={() => {
              console.log('[HOME] Usuario presionó eliminar SIM');
              setShowModal(true);
            }}
          />
        </View>

        <DeleteSimModal
          visible={showModal}
          onClose={() => {
            console.log('[Sim] Usuario canceló eliminación');
            setShowModal(false);
          }}
          onDelete={handleDelete}
          simName={currentSim?.simName ?? currentSim?.name ?? ''}
          isDeleting={false}
        />
      </View>
    </ScrollView>
  );
}
