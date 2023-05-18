import { View } from "react-native";

import { CardInfo } from "./CardInfo";
import { CardTitle } from "./CardTitle";

import { Image } from "phosphor-react-native";

import clsx from "clsx";

interface SolicitationCardProps {
  id: number;
  codigoBem: string;
  dataSolicitacao: string;
  dataAnalise?: string;
  motivo?: string;
  dataAprovacao?: string;
  status?: string;
}

export function SolicitationCard(props: SolicitationCardProps) {
  return (
    <View
      className={clsx(
        "relative justify-center rounded-xl bg-status-green p-5",
        {
          ["bg-status-red"]: props.status === "Manutenção Negada",
          ["bg-status-yellow"]: props.status === "Aguardando Análise",
          ["bg-status-blue"]: props.status === "Em Atendimento",
        }
      )}
    >
      <View className="absolute right-5 top-5">
        <Image color="#FFFFFF" weight="bold" />
      </View>
      <View className="mb-3 flex-row items-center justify-center">
        <CardTitle>{props.codigoBem}</CardTitle>
      </View>
      <CardInfo
        codigoBem={props.codigoBem}
        dataSolicitacao={props.dataSolicitacao}
        dataAnalise={props.dataAnalise}
        motivo={props.motivo}
        dataAprovacao={props.dataAprovacao}
      />
    </View>
  );
}
