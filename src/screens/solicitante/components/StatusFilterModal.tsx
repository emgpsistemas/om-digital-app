import { Text, View } from "react-native";

import { Checkbox } from "../../../components/ui/Checkbox";
import { CustomButton } from "../../../components/ui/CustomButton";
import { CustomModal } from "../../../components/ui/Modal";
import { FilterState } from "../screens/Home";

interface StatusFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  allStatus: FilterState;
  changeStatus: (status: FilterState) => void;
}

export function StatusFilterModal({
  isOpen,
  onClose,
  onConfirm,
  allStatus,
  changeStatus,
}: StatusFilterModalProps) {
  function handleChangeStatus(status: string) {
    if (status === "todas") {
      changeStatus({
        todas: !allStatus.todas,
        aguardandoAnalise: false,
        manutencaoNegada: false,
        emAtendimento: false,
        concluido: false,
      });
    } else {
      changeStatus({
        ...allStatus,
        todas: false,
        [status]: !allStatus[status],
      });
    }
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Text className="font-poppinsBold">
        Selecione as solicitações a serem exibidas por status:
      </Text>
      <View className="mt-2">
        <Checkbox
          title={"Todas"}
          onPress={() => handleChangeStatus("todas")}
          checked={allStatus.todas}
        />
        <Checkbox
          title={"Aguardando Análise"}
          onPress={() => handleChangeStatus("aguardandoAnalise")}
          checked={allStatus.aguardandoAnalise}
        />
        <Checkbox
          title={"Manutenção Negada"}
          onPress={() =>
            changeStatus({
              ...allStatus,
              todas: false,
              manutencaoNegada: !allStatus.manutencaoNegada,
            })
          }
          checked={allStatus.manutencaoNegada}
        />
        <Checkbox
          title={"Em Atendimento"}
          onPress={() => handleChangeStatus("emAtendimento")}
          checked={allStatus.emAtendimento}
        />
        <Checkbox
          title={"Concluído"}
          onPress={() => handleChangeStatus("concluido")}
          checked={allStatus.concluido}
        />
      </View>

      <View className="mt-4 flex flex-row justify-between">
        <View className="w-[48%]">
          <CustomButton
            onPress={() => {
              changeStatus({
                todas: true,
                aguardandoAnalise: false,
                manutencaoNegada: false,
                emAtendimento: false,
                concluido: false,
              });
              onClose();
            }}
            variant="cancel"
          >
            Cancelar
          </CustomButton>
        </View>
        <View className="w-[48%]">
          <CustomButton onPress={onConfirm} variant="primary">
            Confirmar
          </CustomButton>
        </View>
      </View>
    </CustomModal>
  );
}
