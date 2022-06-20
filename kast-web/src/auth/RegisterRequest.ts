import BaseRegisterRequest from '@spryrocks/react-auth/RegisterRequest';

export default interface RegisterRequest extends BaseRegisterRequest {
  referralCode: string | undefined;
}
