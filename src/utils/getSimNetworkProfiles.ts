import { SIM_TYPES, buttonGroupDataPsysical, buttonSg, buttonsR1R2 } from '@/constants/networkProfiles';

export function getSimNetworkProfiles(simType: string, currentNetwork: string) {
  switch (simType) {
    case SIM_TYPES.ELECTRONIC:
      if (currentNetwork === 'r1' || currentNetwork === 'r2') return buttonsR1R2;
      if (currentNetwork === 'sg') return buttonSg;
      return [];
    case SIM_TYPES.PHYSICAL:
      return buttonGroupDataPsysical;
    default:
      return [];
  }
}
