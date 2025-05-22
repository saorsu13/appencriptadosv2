// src/screens/Balance/BalanceScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import SimCurrencySelector from '@/components/organisms/SimCurrencySelector/SimCurrencySelector';
import DataBalanceCard from '@/components/organisms/DataBalanceCard/DataBalanceCard';
import TopUpCard from '@/components/molecules/TopUpCard/TopUpCard';
import DeleteSimButton from '@/components/molecules/DeleteSimButton/DeleteSimButton';
import DeleteSimModal from '@/components/molecules/BalanceModals/DeleteSimModal';
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import { updateCurrentSim } from '@/features/sims/simSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BalanceStackParamList } from '@/navigation/BalanceTypes';
import { useSimManager } from '@/hooks/useSimManager';
import { RootStackParamList } from '@/navigation/types';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useSubscriberData } from '@/hooks/useSubscriberData';

type BalanceNavProp = NativeStackNavigationProp<BalanceStackParamList>;
type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BalanceScreen() {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const sims = useAppSelector(state => state.sims.sims);
  const currentSim = useAppSelector(state => state.sims.currentSim);
  const { restoreSimFromStorage, changeSim, deleteSimAndRedirect } = useSimManager();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const navigationRoot = useNavigation<RootNavProp>();
  const navigationBalance = useNavigation<BalanceNavProp>();

  const { data, isLoading, error } = useSubscriberData(currentSim?.iccid ?? '', {
    enabled: !!currentSim?.iccid,
  });

  const plans = data?.providers?.[0]?.plans ?? [];

  const handleDelete = async () => {
    if (currentSim) {
      const success = await deleteSimAndRedirect(currentSim, sims);
      if (success) {
        setShowModal(false);
      } else {
        setRedirectToLogin(true);
      }
    }
  };
  const handleSimChange = async (newId: string) => {
    const selectedSim = sims.find(sim => sim.idSim === newId);
    if (!selectedSim) return;

    console.log('[BALANCE] SIM seleccionada:', selectedSim.idSim);
    await changeSim(selectedSim);

    if (selectedSim.provider === 'tottoli') {
      console.log('[BalanceScreen] Redirigiendo a SimsList');
      navigationRoot.navigate('RootTabs', {
        screen: 'Sims',
        params: { screen: 'SimsList' },
      });
    } else {
      console.log('[BalanceScreen] Redirigiendo a BalanceMain');
      navigationRoot.navigate('BalanceStack', {
        screen: 'BalanceMain',
      });
    }
  };

  useEffect(() => {
    if (sims.length && currentSim) {
      dispatch(updateCurrentSim(currentSim.idSim));
    }
  }, [sims]);

  useEffect(() => {
    if (sims.length > 0) {
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
    <View
      style={[
        balanceStyles.container,
        {
          backgroundColor: isDark
            ? '#000'
            : '#F0FAFF',
        },
      ]}
    >
      <HeaderEncrypted owner="encriptados" settingsLink="BalanceSettings" />

      <ScrollView contentContainerStyle={balanceStyles.content}>

        <SimCurrencySelector
          sims={sims.map(sim => ({
            id: sim.idSim,
            name: sim.simName ?? sim.name ?? 'SIM',
            number: sim.iccid,
            provider: sim.provider,
            logo: null,
          }))}
          selectedId={currentSim?.idSim ?? ''}
          onSelectSim={handleSimChange}
          onAddSim={() => {
            console.log('[BALANCE] Usuario quiere añadir una nueva SIM');
            navigationBalance.navigate('NewSimEncrypted');
          }}
          onEditSim={(id) => {
            console.log('[BALANCE] Usuario quiere editar la SIM:', id);
            navigationBalance.navigate('EditSimEncrypted', { idSim: id });
          }}
        />

        <View style={balanceStyles.separator} />

        {isLoading ? (
          <View style={balanceStyles.loadingContainer}>
            <ActivityIndicator size="small" color="#00AEEF" />
          </View>
        ) : (
          Array.isArray(plans) &&
          plans.length > 0 &&
          plans.map((plan, index) => {
            const totalMB = Number(plan.pckdatabyte) || 0;
            const usedMB = Number(plan.useddatabyte) || 0;
            if (isNaN(totalMB) || isNaN(usedMB)) {
              console.warn('⚠️ [Balance] Plan inválido:', plan);
              return null;
            }
            const remainingMB = Math.max(totalMB - usedMB, 0);
            const remainingGB = (remainingMB / 1024).toFixed(2);

            return (
              <DataBalanceCard
                key={index}
                totalData={remainingGB}
                format={'GB'}
                region={plan.name || 'Sin región'}
              />
            );
          })
        )}

        <TopUpCard />
        <DeleteSimButton onPress={() => {
          console.log('[BALANCE] Usuario presionó eliminar SIM');
          setShowModal(true);
        }} />
      </ScrollView>

      <DeleteSimModal
        visible={showModal}
        onClose={() => {
          console.log('[BALANCE] Usuario canceló eliminación');
          setShowModal(false);
        }}
        onDelete={handleDelete}
        simName={currentSim?.simName ?? currentSim?.name ?? ''}
        isDeleting={false}
      />
    </View>
  );
}
