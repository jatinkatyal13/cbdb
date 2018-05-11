import {ChainHandler, BaseType} from '@jagql/framework'
import {Batch} from './index'
import {HandlerCallback, JsonApiRequest} from '@jagql/framework/types/Handler'

export default class ValidateIdHandler extends ChainHandler<Batch> {
  beforeCreate = function (request: JsonApiRequest, batch: Batch & BaseType, callback: HandlerCallback<Batch>) {
    if (!batch.id.startsWith(batch.course.id + batch.center.id)) {
      callback({code: 'BATCHIDFORMAT', status: '500',
        title: 'Wrong Batch ID', detail: 'Batch Id should start with course and center code'})
    } else {
      callback(null, batch)
    }
  }
}