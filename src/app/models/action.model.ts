export interface Action {
  id: string;
  label: string;
  enabled: boolean;
  visible: boolean;
  cooldown: number;
}
