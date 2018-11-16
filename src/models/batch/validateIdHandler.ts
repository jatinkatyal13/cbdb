import {BaseType, ChainHandler} from '@jagql/framework'
import {HandlerCallback, JsonApiRequest} from '@jagql/framework/types/Handler'
import {Batch} from './index'

export default class ValidateIdHandler extends ChainHandler<Batch> {
  public beforeCreate = (request: JsonApiRequest, batch: Batch & BaseType, callback: HandlerCallback<Batch>) => {
    if (!batch.id.startsWith(batch.course.id + batch.center.id)) {
      callback({code: 'EBATCHIDFORMAT', status: '500',
        title: 'Wrong Batch ID', detail: 'Batch Id should start with course and center code'})
    } else {
      // TODO: Check year too and month too
      callback(null, batch)
    }
  }
}
