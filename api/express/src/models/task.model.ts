export interface Task {
  id: string;
  titulo: string;
  descricao: string | null;
  criado_por: string,
  criado_em: Date
  atualizado_por: string | null,
  atualizado_em: Date | null
}
