import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="/" className="text-light">Home</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/CommunityGuidelines" className="text-light">Community Guidelines</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/PrivacyPolicy" className="text-light">Private Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/TermsAndConditions" className="text-light">Terms and Conditions</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/ContactUs" className="text-light">Contact Us</a>
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
