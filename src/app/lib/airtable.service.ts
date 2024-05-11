import Airtable, { Base } from 'airtable'

Airtable.configure({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY })

export class AirtableService {
  private baseId = 'appsK0JXjQOdY1fmx'
  private table: string;
  private base: Base;
  constructor(table: string) {
    this.base = Airtable.base(this.baseId);
    this.table = table;
  }

  async listRecords() {
    return this.base(this.table).select().all();
  }

  async updateRecord(recordId: string, updateData: any) {
    return this.base(this.table).update(recordId, updateData);
  }
}