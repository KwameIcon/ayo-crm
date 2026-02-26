
const Footer = () => {
    return (
        <div className="absolute bottom-0 w-full">
            <div className='p-5 flex flex-col justify-center md:flex-row  md:justify-between items-center lg:px-20 opacity-40'>
                <h4 className='w-full md:w-fit text-start font-medium text-xs text-[var(--text-color-50)]'>
                    © {new Date().getFullYear()} aYo Ghana Intermediaries Limited All Rights Reserved. <br />
                    Underwritten by SanlamAllianz Life Insurance Ghana Ltd.
                </h4>

                <h4 className='mt-5 md:mt-0 font-medium text-xs'>
                    Built &amp; Maintained by <span className="text-primary-color dark:text-white">Chiwara Solutions</span>
                </h4>
            </div>
        </div>
    )
}

export default Footer