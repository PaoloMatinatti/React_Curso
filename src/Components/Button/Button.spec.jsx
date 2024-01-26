import { fireEvent,render, screen} from "@testing-library/react"
import { Button } from ".";

describe ('Button />', () => {
    it('should remder the button with the text',() =>{
        render(<Button text = "load more" />);

        expect.assertions(1);
        const button = screen.getByRole('button',{name: /load more/i });

        expect(button).toBeInTheDocument();
    });

    it('call funtion on button cllick',() =>{
        const fn =jest.fn();
        render(<Button text = "load more" onClick ={fn} />);

        const button = screen.getByRole('button',{name: /load more/i });
        fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disable when disable is true',() =>{
        render(<Button text = "load more" disable={true} />);

        const button = screen.getByRole('button',{name: /load more/i });
        expect(button).toBeEnabled();
    });
});