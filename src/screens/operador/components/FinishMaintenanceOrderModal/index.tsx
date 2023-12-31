import { useNavigation } from "@react-navigation/native";
import { Square } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";

interface FinishMaintenanceOrdemModalProps {
  isSwipeableTrigger?: boolean;
  omId: number;
}

export function FinishMaintenanceOrderModal({
  isSwipeableTrigger = false,
  omId,
}: FinishMaintenanceOrdemModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const { om } = useContext(OMContext);

  function handleFinishMaintenanceOrder() {
    const handledOm = om.find((om) => om.id === omId)?.atividades;
    const isAllActivitiesFinished = handledOm?.every(
      (atividade) => atividade.status === "Concluída"
    );

    if (isAllActivitiesFinished) {
      navigation.navigate("CloseMaintenanceOrder", { id: omId });
      setIsModalVisible(false);
    } else {
      setIsModalVisible(false);
      Alert.alert(
        "Atenção",
        "Todas as atividades devem estar concluídas para finalizar uma OM. Verifique as atividades pendentes."
      );
    }
  }

  return (
    <>
      {/* Modal Trigger */}

      {isSwipeableTrigger ? (
        <View className="items-center gap-1">
          <TouchableOpacity
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-green"
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
          >
            <Square size={30} color="#FFFFFF" weight="bold" />
          </TouchableOpacity>
          <Text className="font-poppinsMedium text-sm">Finalizar</Text>
        </View>
      ) : (
        <CustomButton variant="finish" onPress={() => setIsModalVisible(true)}>
          Finalizar
        </CustomButton>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você tem certeza que deseja encerrar a Ordem de Manutenção?
        </Text>
        <View className="mt-16 flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton
              variant="primary"
              onPress={handleFinishMaintenanceOrder}
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
