export interface TeamData {
  id: number;
  ranking: number;
  name: string;
  logo: string;
  players: PlayerData[];
}

export interface PlayerData {
  fullname: string;
  image: string;
  nickname: string;
  country: {
    name: string;
    flag: string;
  };
}
