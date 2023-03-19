import React, { useState } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

const task = () => {
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [gotData, setGotData] = useState({});
    const [isEditButtonPressed, setIsEditButtonPressed] = useState(false);
    const [pressedUserId, setPressedUserId] = useState('');
    console.log(pressedUserId);
    return (
        <div className='min-h-screen mx-16'>
            <div>
                <Form isDataChanged={isDataChanged} setIsDataChanged={setIsDataChanged} isFormActive={isFormActive} setIsFormActive={setIsFormActive} setGotData={setGotData} isEditButtonPressed={isEditButtonPressed} setIsEditButtonPressed={setIsEditButtonPressed} pressedUserId={pressedUserId}></Form>
            </div>

            <div className='flex justify-center mb-8'>
                <Table setIsDataChanged={setIsDataChanged} setIsFormActive={setIsFormActive} gotData={gotData} setIsEditButtonPressed={setIsEditButtonPressed} setPressedUserId={setPressedUserId}></Table>
            </div>
        </div>
    );
};

export default task;