import {BaseType, ChainHandler} from '@jagql/framework'
import {HandlerCallback, JsonApiRequest} from '@jagql/framework/types/Handler'
import {Batch} from './index'

export default class ValidateIdHandler extends ChainHandler<Batch> {
  public beforeCreate = (request: JsonApiRequest, batch: Batch & BaseType, callback: HandlerCallback<Batch>) => {
    if (!batch.id.startsWith(batch.course.id + batch.center.id)) {
      callback({code: 'BATCHIDFORMAT', status: '500',
        title: 'Wrong Batch ID', detail: 'Batch Id should start with course and center code'})
    } else {
      callback(null, batch)
    }
  }
}
