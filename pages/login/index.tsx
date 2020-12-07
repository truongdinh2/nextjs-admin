import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const customFormat = value => {
    return `custom format: ${value.format(dateFormat)}`;
};
const now = moment()
now.format('MMMM Do YYYY, h:mm:ss a')
console.log(moment().format('L'))
console.log(moment().format('LT'))
export default function SwitchablePicker() {
    // const [type, setType] = useState('time');
    return (
        <Space direction="vertical" size={12}>
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={(e)=>console.log(e)}/>
            <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
            <RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
            />
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={customFormat} />
        </Space>
    );
}


