import { Account } from '../entities/account.entity';

export type UpdateUserProviderByProviderIdData = Partial<
  Pick<Account, 'username' | 'email'>
>;
