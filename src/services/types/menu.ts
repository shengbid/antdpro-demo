export interface menuTabProps {
  tab: string;
  pathname?: string;
  key: string;
  closable?: boolean;
}

export interface menuItemProps {
  name: string;
  path?: string;
  children?: menuItemProps[];
}
