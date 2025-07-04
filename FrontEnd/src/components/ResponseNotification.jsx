import { useEffect } from "react";
import { motion } from 'framer-motion';
import '../response.css'; // link to the CSS file

const ResponseNotification = ({ visible, onClose, response, msg }) => {

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="rn-container">
      <div className="rn-box">
        {response === 'true' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rn-icon-wrapper rn-icon-success">
              <svg className="rn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="rn-title">Thank You!</h2>
            <p className="rn-message">{msg}</p>
            <button className="rn-button rn-button-success" onClick={onClose}>OK</button>
          </motion.div>
        )}

        {response === 'false' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rn-icon-wrapper rn-icon-error">
              <svg className="rn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="rn-title">Oops!</h2>
            <p className="rn-message">Something went wrong</p>
            <button className="rn-button rn-button-error" onClick={onClose}>OK</button>
          </motion.div>
        )}

        {response === 'loading' && (
          <div className="rn-loading">
            <h3>Please Wait</h3>
            <div className="loader"></div>
            <span>Your data is uploading</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseNotification;
