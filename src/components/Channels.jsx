import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
	const { channels, currentChannelId } = state;
	const props = {
		channels,
		currentChannelId,
	};
	return props;
}

const actionCreators = {
	switchChannel: actions.switchChannel,
};

const Channels = ({ channels, currentChannelId, switchChannel }) => {
	const handleSwitchChannel = (id) => () => {
		switchChannel({ id });
	}
		return (
			<div className="col-3 border-right">
				<div className="d-flex mb-2">
					<span>Channels</span>
					<button type="button" className="ml-auto p-0 btn btn-link">+</button>
				</div>
				<ul className="nav flex-column nav-pills nav-fill">
					{channels.map(({id, name, removable}) => {
						const isCurrentChannel = id === currentChannelId ? true : false;
						const channelBtnClass = cn({
							'nav-link': true,
							'btn-block': true,
							'mb-2': true,
							'text-left': true,
							'btn': true,
							'btn-primary': isCurrentChannel,
							'btn-light': !isCurrentChannel,
						});
						return (
							<li key={id} className="nav-item">
								<button onClick={handleSwitchChannel(id)} type="button" className={channelBtnClass}>
									{name}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		);
}

export default connect(mapStateToProps, actionCreators)(Channels);
