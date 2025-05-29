export interface DeleteProducts {
  delete(params: { id: number }): Promise<boolean>;
};

export namespace DeleteProducts {
  export type Request = {
    params: { id: number }
  };
};
