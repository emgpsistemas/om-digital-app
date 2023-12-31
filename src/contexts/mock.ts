import { LoginFormData } from '../validations/common/LoginScreen';

const operador = {
  user: 'Operador',
  role: 'operador',
  session: '123456789',
};

const manutencao = {
  user: 'Manutenção',
  role: 'manutencao',
  session: '987654321',
};

const logistica = {
  user: 'Logística',
  role: 'logistica',
  session: '234876534',
};

const solicitante = {
  user: 'Solicitante',
  role: 'solicitante',
  session: '345978234',
};

export function SignInWithCredentials({ userCPF, password }: LoginFormData) {
  if (userCPF === '111.111.111-11') {
    return {
      data: operador,
      error: null,
    };
  }
  if (userCPF === '222.222.222-22') {
    return {
      data: manutencao,
      error: null,
    };
  }
  if (userCPF === '333.333.333-33') {
    return {
      data: logistica,
      error: null,
    };
  }
  if (userCPF === '444.444.444-44') {
    return {
      data: solicitante,
      error: null,
    };
  }
  return {
    data: null,
    error: { message: 'Usuário ou senha inválidos' },
  };
}
