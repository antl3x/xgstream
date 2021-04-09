import * as $Log from '$Log';

export class Market {
  public id: string;
  public status = 'UNK' as const;

  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'Market',
  });

  constructor(i: { marketId: string }) {
    this.id = i.marketId;
    this._log.info (`market was created [id: ${this.id}]`);
  }
}
