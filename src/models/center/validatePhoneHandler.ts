import {BaseType, ChainHandler} from '@jagql/framework'
import {HandlerCallback, JsonApiRequest} from '@jagql/framework/types/Handler'
import {parsePhoneNumber} from 'libphonenumber-js'
import { Center } from '.'

export default class ValidateIdHandler extends ChainHandler<Center> {
  public beforeCreate = (request: JsonApiRequest, center: Center & BaseType, callback: HandlerCallback<Center>) => {
    const phone = parsePhoneNumber(center.contactNo)

    if (phone.isValid()) {
        center.contactNo = phone.format('INTERNATIONAL')
    } else {
        callback({code: 'PHONEFORMAT', status: '500',
            title: 'Invalid Phone Number', detail: 'Invalid Phone Number format'})
    }
  }
}
