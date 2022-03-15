package com.ap.kas.models;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tblFiles")
public class FileStorage {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private String type;

    @Lob
    private byte[] data;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "credit_request_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private CreditRequest creditRequest;


    public FileStorage() {}

    public FileStorage(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }


    public String getId() { return this.id; }

    public void setId(String id) { this.id = id; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getType() { return this.type; }

    public void setType(String type) { this.type = type; }

    public byte[] getData() { return this.data; }

    public void setData(byte[] data) { this.data = data; }

    public CreditRequest getCreditRequest() { return this.creditRequest; }

    public void setCreditRequest(CreditRequest creditRequest) { this.creditRequest = creditRequest; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof FileStorage)) {
            return false;
        }
        FileStorage fileStorage = (FileStorage) o;
        return Objects.equals(id, fileStorage.id) && Objects.equals(name, fileStorage.name) && Objects.equals(type, fileStorage.type) && Objects.equals(data, fileStorage.data) && Objects.equals(creditRequest, fileStorage.creditRequest);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, data, creditRequest);
    }
    

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", data='" + getData() + "'" +
            ", creditRequest='" + getCreditRequest() + "'" +
            "}";
    }

}
