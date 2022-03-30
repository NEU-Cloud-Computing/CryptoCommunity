package com.example.CryptoCommunityServer.models;

import java.io.Serializable;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentityGenerator;

// Necessary to override generated ids. Sourced from https://stackoverflow.com/questions/11667929/jpa-override-auto-generated-id
public class UseExistingIdOtherwiseGenerateUsingIdentity extends IdentityGenerator {
  @Override
  public Serializable generate(
      SharedSessionContractImplementor session, Object object) throws HibernateException {
    Serializable id = session.getEntityPersister(null, object).getClassMetadata().getIdentifier(object, session);
    return id != null ? id : super.generate(session, object);
  }
}
