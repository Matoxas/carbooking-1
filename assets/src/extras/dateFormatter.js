const dateWithoutTime = date => {
    const FormatedDate = new Date(date);
     return new Date(FormatedDate.setHours(0, 0, 0, 0)).toJSON().replace("T", " ");
  };

  export default dateWithoutTime;