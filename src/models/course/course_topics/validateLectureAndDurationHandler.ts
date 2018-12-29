import {BaseType, ChainHandler} from '@jagql/framework'
import {HandlerCallback, JsonApiRequest} from '@jagql/framework/types/Handler'
import { CourseTopics } from '.'

export default class ValidateLectureAndDurationHandler extends ChainHandler<CourseTopics> {
  public beforeCreate = (request: JsonApiRequest, topic: CourseTopics & BaseType, callback: HandlerCallback<CourseTopics>) => {

    if (topic.minLectures > topic.maxLectures) {
        callback({code: 'LECTURELENGTH', status: '500',
            title: 'Min is greater than max lectures', detail: 'Minimum lectures should be less than maximum lectures'})
    } else if (topic.minDuration > topic.maxDuration) {
        callback({code: 'LECTUREDURATION', status: '500',
            title: 'Min is greater than max duration', detail: 'Minimum duration should be less than maximum duration'})
    } else {
        callback(null, topic)
    }

  }
}
