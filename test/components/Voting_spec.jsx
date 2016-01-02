import React from 'react/addons';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        let voteWith;
        function vote(entry) { voteWith = entry };
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(voteWith).to.equal('Trainspotting');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttributes('disabled')).to.equal(true);
        expect(buttons[1].hasAttributes('disabled')).to.equal(true);
    });

    it('adds a label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when the is one', () => {
        const component = renderIntoDocument(
            <Voting winner="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = React.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });
});