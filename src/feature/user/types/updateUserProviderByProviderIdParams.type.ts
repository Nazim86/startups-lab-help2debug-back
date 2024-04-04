import { Account } from '../entities/account.entity';

export type UpdateUserProviderByProviderIdParams = Pick<
  Account,
  'userId' | 'providerUserId' | 'provider'
>;
