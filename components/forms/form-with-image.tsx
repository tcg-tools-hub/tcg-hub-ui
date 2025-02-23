import React, { forwardRef } from 'react';
import Image, { StaticImageData } from 'next/image';

const FormWithImage = forwardRef(({ children, imageSrc }: { children: ReactNode, imageSrc: StaticImageData }) => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src={imageSrc}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
});

export default FormWithImage;
