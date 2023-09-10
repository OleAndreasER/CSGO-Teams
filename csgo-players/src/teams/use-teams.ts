import { useQuery } from "@tanstack/react-query";
import { TeamData } from "./teams";

export const useTeams = (): TeamData[] | undefined =>
  useQuery<TeamData[]>({
    queryFn: () =>
      fetch("https://hltv-api.vercel.app/api/player.json").then((response) =>
        response.json()
      ),
    queryKey: ["teams"],
  }).data;
