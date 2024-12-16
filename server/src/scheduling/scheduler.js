/**
 * Comparator function for 2 appointments. See the definition of array.sort()
 */
const appointmentComparator = (a, b) => a.dateCreated - b.dateCreated;

/**
 * Returns a new copy of the array, appending scheduling info to each appointment.
 * Doesn't change the order of the array.
 */
const appendSchedule = (appointments) => {
    const comparator = (a, b) => appointmentComparator(a.appointment, b.appointment)
    const sortedArray = appointments.map((appointment, index) => ({ appointment, index })).sort(comparator);

    const orderMap = new Map();
    sortedArray.forEach((item, index) => {
        const visitOrder = index + 1;
        orderMap.set(item.index, visitOrder);
    });

    return appointments.map((appointment, index) => ({
        ...appointment,
        schedule: {
            order: orderMap.get(index),
        },
    }))
}

export { appendSchedule }