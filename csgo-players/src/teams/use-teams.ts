import { useQuery } from "@tanstack/react-query";
import { Team } from "./teams";

export const useTeams = (): Team[] | undefined =>
  useQuery<Team[]>({
    queryFn: () =>
      fetch("https://hltv-api.vercel.app/api/player.json").then((response) =>
        response.json()
      ),
    queryKey: ["teams"],
  }).data;
