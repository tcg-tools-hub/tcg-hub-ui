"use client"

import Link from "next/link";

const Footer = () => {
    const sections = [
        {
            title: "Produto",
            links: [
                { name: "Ferramentas", href: "/#overview" },
                // { name: "Preços", href: "/#pricing" },
            ],
        },
        {
            title: "Social",
            links: [
                { name: "Twitter", href: "https://x.com" },
                { name: "Instagram", href: "https://instagram.com" },
                { name: "LinkedIn", href: "https://linkedin.com" },
            ],
        },
    ];

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 xl:px-16 flex-1 bg-gray-50">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                {sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="mb-8">
                        <h3 className="mb-4 font-bold">{section.title}</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            {section.links.map((link, linkIdx) => (
                                <li
                                    key={linkIdx}
                                    className="font-medium hover:text-primary"
                                >
                                    <Link href={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t pt-8 text-sm font-medium text-muted-foreground mt-auto">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2025 Copyright. All rights reserved.</p>
                    <ul className="flex gap-4">
                        <li className="underline hover:text-primary">
                            <a href="#">Terms and Conditions</a>
                        </li>
                        <li className="underline hover:text-primary">
                            <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
