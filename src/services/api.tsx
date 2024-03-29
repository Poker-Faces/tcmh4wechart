// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/chapter?${stringify(params)}`);
}

export async function queryUserList(params) {
  return request(`/admin/user/list?${stringify(params)}`);
}
