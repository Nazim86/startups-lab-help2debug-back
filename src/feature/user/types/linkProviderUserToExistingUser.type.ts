import { Account } from '../entities/account.entity';

type OptionalFields = Partial<Pick<Account, 'id' | 'username' | 'email'>>;
type RequiredFields = Omit<Account, 'id' | 'username' | 'email'>;

export type LinkProviderUserToExistingUser = OptionalFields & RequiredFields;
