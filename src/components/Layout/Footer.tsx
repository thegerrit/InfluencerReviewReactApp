import React from 'react';
import '../../styles/footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto custom-footer footer-colors">
            <div className="container custom-footer-container footer-colors">
                <div className="row footer-colors">
                    <div className="col-md-12 text-center footer-colors">
                        <ul className="list-inline footer-colors">
                            <li className="list-inline-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/CommunityGuidelines">Community Guidelines</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/PrivacyPolicy">Private Policy</a>
                            </li>
                            {/* <li className="list-inline-item">
                                <a href="/TermsAndConditions">Terms and Conditions</a>
                            </li> */}
                            <li className="list-inline-item">
                                <a href="/ContactUs">Contact Us</a>
                            </li>
                        </ul>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Rate My Influencer. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
