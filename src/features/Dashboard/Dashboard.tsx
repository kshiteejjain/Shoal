import { SetStateAction, useState, useMemo, useEffect } from 'react';
import { RootState } from 'app/redux/store';
import { useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom';
import data from '../../../public/Data.json';
import SideNavigation from '../../Components/SideNavigation/SideNavigation';
import Pagination from '../../Components/Pagination/Pagination';
let PageSize = 10;

import './Dashboard.css';

const Dashboard = () => {
    const [value, setValue] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDetails, setIsDetails] = useState(false);
    const [isFromDate, setIsFromDate] = useState('');
    const [isToDate, setIsToDate] = useState('');
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.persistedReducer.Auth.isLoggedIn);

    const convertDates = (e: { split: (arg0: string) => [any, any, any]; } | undefined) => {
        const [year, month, day] = e.split('-')
        return (`${day}-${month}-${year}`)
    }
    let isFromDateFormatted = convertDates(isFromDate);
    let isToDateFormatted = convertDates(isToDate);

    const handleSubmit = () => {
        if (!toggle) {
            setToggle(!toggle)
            return;
        }
        if (isFromDate === '' && isToDate === ''){
            alert('Pls select dates');
            return;
        }
        return (currentTableData.filter(item => item.date >= isFromDateFormatted && item.date <= isToDateFormatted)
            .map((item, i) => {
                return (
                    <tr key={i}>
                        <td onClick={handleClick} className="depositId">{item.DepositId}</td>
                        <td>{item.date}</td>
                        <td>{item.narration}</td>
                        <td>{item.refNo}</td>
                        <td>{item.withdrawal}</td>
                        <td>{item.deposit}</td>
                        <td>{item.ClosingBalance}</td>
                    </tr>
                );
            }))
    };

    const handleReset = () => {
        setToggle(false);
        setIsFromDate('');
        setIsToDate('');

    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const handleClick = () => {
        setIsDetails(true);
    };

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        if (e.target.value === 'SelectDates') {
            setValue(true)
        }
        if (e.target.value === 'Today') {
            setValue(false)
        }
    };

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/');
        }

    }, [])

    const Header = ["Deposit Id", "Date", "Narration", "Cheque/Ref. No.", "Withdrawal", "Deposit", "Closing Balance"];
    return (
        <>
            <SideNavigation />
            <div className="inner-page">
                <div className="container-fluid">
                    <div className='filters'>
                        <label>Filter Options:</label>
                        <select className='dropdown' onChange={handleChange}>
                            <option value="Today">Today</option>
                            <option value="SelectDates">Select Dates</option>
                        </select>
                        {value &&
                            <form className='datepicker' onSubmit={(event) => event.preventDefault()}>
                                <label>From Date:</label>
                                <input type="date" placeholder='From Date' value={isFromDate} name="isFromDate" onChange={(e) => setIsFromDate(e.target.value)} />
                                <label>To Date:</label>
                                <input type="date" placeholder='To Date' value={isToDate}  onChange={(e) => setIsToDate(e.target.value)} />
                                <input type='submit' value="Search" onClick={handleSubmit} />
                                <input type='reset' value="Reset" onClick={handleReset} />
                            </form>
                        }
                    </div>
                    <h2>All Transactions</h2>
                    <div className='pageWrapper'>
                        <div className={isDetails ? 'tableWrapper' : 'tableWrapperAdjust'}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Deposit Id</th>
                                        <th>Date</th>
                                        <th>Narration</th>
                                        <th>Cheque/Ref. No.</th>
                                        <th>Withdrawal</th>
                                        <th>Deposit</th>
                                        <th>Closing Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toggle ? <>{handleSubmit()}</> : <>{currentTableData.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td onClick={handleClick} className="depositId">{item.DepositId}</td>
                                                <td>{item.date}</td>
                                                <td>{item.narration}</td>
                                                <td>{item.refNo}</td>
                                                <td>{item.withdrawal}</td>
                                                <td>{item.deposit}</td>
                                                <td>{item.ClosingBalance}</td>
                                            </tr>
                                        );
                                    })}</>}
                                </tbody>
                            </table>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={data.length}
                                pageSize={PageSize}
                                onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
                            />
                        </div>
                        {isDetails &&
                            <div className='detailTransaction'>
                                <label>Date</label>
                                <p>23 Feb 2023</p>
                                <label>Deposit Id</label>
                                <p>123456</p>
                                <label>Narration</label>
                                <p>Paid-JohnDoe-paypalqr2818764786750101x1oubdhaakc5@paypal-PYPL876875</p>
                                <label>Cheque/Ref. No.</label>
                                <p>305461775374</p>
                                <label>Amount</label>
                                <p>5000</p>
                                <a href={void (0)} onClick={() => setIsDetails(false)} className='buttonPrimary'>Close</a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;