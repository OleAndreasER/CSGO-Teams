export interface Team {
  id: number;
  ranking: number;
  name: string;
  logo: string;
  players: Player[];
}

export interface Player {
  fullname: string;
  image: string;
  nickname: string;
  country: {
    name: string;
    flag: string;
  };
}
