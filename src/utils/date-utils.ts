import moment from "moment";

const fromNow = (date: Date): string => {
    const dateMoment = moment(date);
    return dateMoment.fromNow();
};

export default { fromNow };
