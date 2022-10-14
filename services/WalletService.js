import AbstractService from "./AbstractService";

const API = {
  GET_WALLET: "Wallets/getbycustomerid",
};

class WalletService extends AbstractService {
  getWallet = (id) => {
    return this.httpGET(
      API.GET_WALLET,
      {id},
    );
  };
}

export const walletService = new WalletService();
