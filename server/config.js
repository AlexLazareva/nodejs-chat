"use strict";

module.exports = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: '0NETjPmf2dxu'
    },
    expiresIn: '1 day'
};
