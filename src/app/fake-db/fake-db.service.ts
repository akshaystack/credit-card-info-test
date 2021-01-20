import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CCInfoDb } from 'src/app/fake-db/ccDetail.data';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // Credit Card Info API
      'credit-card-Info': CCInfoDb.creditCardData,
    };
  }
}
