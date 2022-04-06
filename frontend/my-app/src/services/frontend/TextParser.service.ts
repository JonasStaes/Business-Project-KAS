class TextParser {
    cleanUpRole = (role: string) => {
        return role.toLowerCase().replaceAll(/_/g, " ")
    }

    cleanUpRoles = (roles: Array<string>) => {
        return roles.map(role => this.cleanUpRole(role)).join(", ");
    }

    cleanUpStatus = (status: string) => {
        return status.toLowerCase().replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }
}

export default new TextParser();