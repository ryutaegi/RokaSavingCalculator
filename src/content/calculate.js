import React, { useState, useEffect } from 'react';

const MilitarySavingsCalculator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [monthlyDeposits, setMonthlyDeposits] = useState([]);
    const [interestRate, setInterestRate] = useState(5); // Default interest rate set to 5%
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert("종료일은 시작일보다 나중이어야 합니다.");
            return;
        }

        const deposits = [];
        let current = new Date(start);

        while (current <= end) {
            deposits.push({ date: new Date(current), amount: 0 });
            current.setMonth(current.getMonth() + 1);
        }

        setMonthlyDeposits(deposits);
    }, [startDate, endDate]);

    const handleDateChange = (isStart, value) => {
        if (isStart) {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const handleSetMaximum = () => {
        const deposits = monthlyDeposits.map(({ date }) => {
            return {
                date,
                amount: date.getFullYear() === 2023 ? 400000 :
                    date.getFullYear() === 2024 ? 400000 :
                    date.getFullYear() === 2025 ? 550000 :
                    date.getFullYear() === 2026 ? 550000 : 0,
            };
        });
        setMonthlyDeposits(deposits);
    };

    const handleDepositChange = (index, value) => {
        const newDeposits = [...monthlyDeposits];
        newDeposits[index].amount = Number(value);
        setMonthlyDeposits(newDeposits);
    };

    const adjustDeposit = (index, adjustment) => {
        const newDeposits = [...monthlyDeposits];
        newDeposits[index].amount = Math.max(0, newDeposits[index].amount + adjustment);
        setMonthlyDeposits(newDeposits);
    };

    const calculateResults = () => {
        const totalPrincipal = monthlyDeposits.reduce((sum, { amount }) => sum + amount, 0);

        let totalInterest = 0;
        monthlyDeposits.forEach(({ amount, date }) => {
            const monthsUntilEnd = Math.max(0, (new Date(endDate).getFullYear() - date.getFullYear()) * 12 + (new Date(endDate).getMonth() - date.getMonth()));
            totalInterest += amount * ((interestRate / 100) / 12) * monthsUntilEnd;
        });

        setTotalPrincipal(totalPrincipal);
        setTotalInterest(totalInterest);
    };

    return (
        <div style={{ padding: '20px', marginLeft: "10px", marginRight: "10px", fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>군적금 계산기</h1>
            <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between" }}>
                <label>적금 첫 납부일: </label>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => handleDateChange(true, e.target.value)} 
                />
            </div>
            <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between" }}>
                <label>전역일: </label>
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => handleDateChange(false, e.target.value)} 
                />
            </div>
            {monthlyDeposits.length > 0 && (
                <div>
                    <button 
                        style={{
                            width: '100%',
                            backgroundColor: '#FF9800',
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '15px',
                            fontSize: '13px'
                        }} 
                        onClick={handleSetMaximum}
                    >
                        최대값
                    </button>
                    {monthlyDeposits.map(({ date, amount }, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '5px' }}>
                            <label style={{ flex: 1, fontSize: "13px" }}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월:`}</label>
                            <input 
                                type="number" 
                                value={amount} 
                                onChange={(e) => handleDepositChange(index, e.target.value)} 
                                style={{ flex: 1, width: "30%", marginRight: "5px" }}
                            />
                            <button 
                                onClick={() => adjustDeposit(index, 50000)}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize: '13px',
                                }}
                            >
                                +5만
                            </button>
                            <button 
                                onClick={() => adjustDeposit(index, -50000)}
                                style={{
                                    backgroundColor: '#F44336',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    fontSize: "13px",
                                }}
                            >
                                -5만
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {monthlyDeposits.length > 0 && (
                <div>
                    <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between" }}>
                        <label>금리 (기본 5%): </label>
                        <div>
                            <input 
                                type="number" 
                                value={interestRate} 
                                onChange={(e) => setInterestRate(Number(e.target.value))} 
                            /> %
                        </div>
                    </div>
                    <button
                        style={{
                            width: '100%',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }} 
                        onClick={calculateResults}
                    >
                        계산
                    </button>
                </div>
            )}
            <div style={{ marginTop: '20px', backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center' }}>내가 받을 금액은?</h2>
                <p>원금 : {totalPrincipal.toLocaleString()} 원</p>
                <p>이자 : {totalInterest.toLocaleString()} 원</p>
                <p>매칭지원금 : {totalPrincipal.toLocaleString()} 원</p>
                <p style={{ fontSize: '12px', color: 'gray', marginTop: '-10px' }}>
                    2024, 2025 매칭지원금 100% 기준
                </p>
                <h3>합계 (원금 + 이자 + 매칭지원금): {(totalPrincipal + totalPrincipal + totalInterest).toLocaleString()} 원</h3>
            </div>
        </div>
    );
};

export default MilitarySavingsCalculator;
