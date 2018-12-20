
import moment from 'moment';

const dateFormated = date => {
    // const dateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
    const DateIncremented = moment(date).startOf('day').add(1, "d").toDate();
    return DateIncremented.toJSON().replace("T", " ");
  };

  export default dateFormated;