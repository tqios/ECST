import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmailorPwdError({isOpen, onClose}) {

    return (
        <Modal

            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white rounded shadow-md"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Error Modal"

        >
            <div>
                <h2 className="font-bold">로그인 오류</h2>
            </div>
            <div className="mt-4">
                <p>이메일 혹은 비밀번호를 잘못입력했습니다. 다시 시도해주세요.</p>
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-active" onClick={onClose}>Close</button>
            </div>
        </Modal>

    );

}

export default EmailorPwdError;