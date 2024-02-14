import React from 'react';

import Modal from 'react-modal';


Modal.setAppElement('#root');

function Errormodal({isOpen, onClose}) {
    return (
        <Modal
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white rounded shadow-md"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="EmailorPwderror Modal"
        >
            <div>
                <h2 className="font-bold">회원가입 실패: 서버 오류</h2>
            </div>
            <div className="mt-4">
                <p>회원가입 과정에서 오류가 발생했습니다. 다시 시도해주세요.</p>
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-active" onClick={onClose}>Close</button>
            </div>
        </Modal>

    );
}

export default Errormodal;