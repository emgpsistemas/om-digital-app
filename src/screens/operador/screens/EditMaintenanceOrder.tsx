import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View } from "react-native";
import { Header } from "../../../components/Header";
import { CustomButton } from "../../../components/ui/CustomButton";
import { OMContext } from "../../../contexts/om-context";
import { OperationInfoCard } from "../../manutencao/components/OperationInfoCard";
import { SymptomsCard } from "../components/SymptomsCard";

export function EditMaintenanceOrder() {
  const { om } = useContext(OMContext);

  const route = useRoute();
  const operationId = route.params as { id: number };

  const filteredOM = om.filter((om) => om.id === operationId.id);
  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
  };
  const symptoms = filteredOM[0]?.sintomas;

  return (
    <View className="flex-1 bg-white">
      <Header title={"Editar Ordem de Manutenção"} />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <View className="flex-1 p-4">
        <Text className="mb-4 font-poppinsBold text-lg">Sintomas:</Text>
        <SymptomsCard symptoms={symptoms} operationId={operationId.id} />
      </View>
      <View className="p-4">
        <CustomButton variant="primary">Editar</CustomButton>
      </View>
    </View>
  );
}