import { IDarajaConfig } from './config.interface';
import { Daraja } from './daraja';
import { DarajaConfigError } from './errors';
import {
  MISSING_APP_CONSUMER_KEY,
  MISSING_APP_CONSUMER_SECRET,
  MISSING_APP_SHORTCODE,
  MISSING_PASSKEY_PARAMETER
} from './errors/constants';

export class DarajaBuilder {
  private config: Partial<IDarajaConfig>;
  /**
   * Creates an instance of DarajaBuilder.
   * @param {number} shortcode - the business shortcode
   * @param {string} consumerKey - the application's Consumer Key
   * @param {string} consumerSecret - the appliaction's Consumer Secret
   * @param {('production' | 'sandbox')} [environment='sandbox'] - the
   * environment to run Daraja in
   * @memberof DarajaBuilder
   */
  constructor(
    private shortcode: number,
    private consumerKey: string,
    private consumerSecret: string,
    environment: 'production' | 'sandbox' = 'sandbox'
  ) {
    if (!shortcode) {
      throw new DarajaConfigError(MISSING_APP_SHORTCODE);
    }
    if (!consumerKey) {
      throw new DarajaConfigError(MISSING_APP_CONSUMER_KEY);
    }
    if (!consumerSecret) {
      throw new DarajaConfigError(MISSING_APP_CONSUMER_SECRET);
    }
    this.config = { environment };
  }

  /**
   *
   *
   * Adds the Lipa Na M-Pesa Online Passkey to the configuration
   * @param {string} passkey - the app's Lipa Na M-Pesa Online
   * Passkey
   * @returns {DarajaBuilder}
   * @memberof DarajaBuilder
   */
  public addLipaNaMpesaConfig(
    passkey: string,
    transactionType:
      | 'CustomerPayBillOnline'
      | 'CustomerBuyGoodsOnline' = 'CustomerPayBillOnline'
  ): DarajaBuilder {
    if (!passkey) {
      throw new DarajaConfigError(MISSING_PASSKEY_PARAMETER);
    }
    this.config = {
      ...this.config,
      lipaNaMpesa: { passkey, transactionType }
    };
    return this;
  }

  public build() {
    return new Daraja(
      this.shortcode,
      this.consumerKey,
      this.consumerSecret,
      this.config
    );
  }
}
