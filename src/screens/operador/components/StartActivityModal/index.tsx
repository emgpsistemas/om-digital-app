import { Play } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";

interface StartActivityModalProps {
  omId: number;
  activityId: number;
}

export function StartActivityModal({
  omId,
  activityId,
}: StartActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { pauseOrInitiateActivity } = useContext(OMContext);

  function handleStartActivity() {
    pauseOrInitiateActivity(activityId, omId, "Em andamento");
    setIsModalVisible(false);
  }

  return (
    <>
      {/* Modal Trigger */}
      <View className="items-center gap-1">
        <TouchableOpacity
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-green"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <View className="pr-1">
            <Play size={30} color="#FFFFFF" weight="bold" />
          </View>
        </TouchableOpacity>
        <Text className="font-poppinsMedium text-sm">Iniciar</Text>
      </View>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja iniciar a atividade?
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
            <CustomButton variant="primary" onPress={handleStartActivity}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
